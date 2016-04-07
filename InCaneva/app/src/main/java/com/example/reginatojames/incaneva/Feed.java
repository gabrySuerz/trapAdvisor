package com.example.reginatojames.incaneva;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;
import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.RequestParams;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;

import cz.msebera.android.httpclient.Header;

public class Feed extends AppCompatActivity {

    ListView mylist;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_feed);

        mylist = (ListView) findViewById(R.id.listView);
        getFeed();

    }

    public void getFeed() {

                RequestParams params = new RequestParams();
                params.add("action", "incaneva_events");
                params.add("blog", "1,6,7,8");
                params.add("old", "true");
                params.add("limit", "20");


                AsyncHttpClient asyncHttpClient = new AsyncHttpClient();
                asyncHttpClient.post("http://incaneva.it/wp-admin/admin-ajax.php", params, new AsyncHttpResponseHandler() {
                    @Override
                    public void onSuccess(int statusCode, Header[] headers, byte[] responseBody) {
                        boolean success;
                        try {
                            JSONObject jsonObject = new JSONObject(new String(responseBody));

                            success = jsonObject.getBoolean("success");

                            if (success) {

                                Toast.makeText(Feed.this, "success", Toast.LENGTH_SHORT).show();
                                //txt.setMovementMethod(new ScrollingMovementMethod());

                                //txt.setText(jsonObject.getJSONArray("data").toString());
                                JSONArray data = jsonObject.getJSONArray("data");

                                if(data != null) {
                                    String[] title = new String[data.length()];
                                    String[] minidesc = new String[data.length()];
                                    for(int i = 0 ; i < data.length() ; i++) {
                                        title[i] = data.getJSONObject(i).getString("post_title");
                                        //minidesc[i] = data.getString(5);
                                    }

                                    final ArrayList<String> listp = new ArrayList<String>();
                                    for (int i = 0; i < title.length; ++i) {
                                        listp.add(title[i]);
                                    }
                                    mylist.setAdapter(new ArrayAdapter<String> (Feed.this, android.R.layout.simple_list_item_1, listp));
                                }



                            } else {
                                Toast.makeText(Feed.this, "Errore!", Toast.LENGTH_SHORT).show();
                            }
                        } catch (Exception e) {
                            Toast.makeText(Feed.this, "Errore", Toast.LENGTH_SHORT).show();
                            e.printStackTrace();
                        }
                    }

                    @Override
                    public void onFailure(int statusCode, Header[] headers, byte[] responseBody, Throwable error) {
                        error.printStackTrace();
                        Toast.makeText(Feed.this, "Connessione fallita: " + error.getLocalizedMessage(), Toast.LENGTH_SHORT).show();
                    }
                });
            }
}
