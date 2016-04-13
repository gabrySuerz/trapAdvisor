package com.example.reginatojames.incaneva;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
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
    ArrayList <CEvent> allFeed;
    CEvent temp;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_feed);
        allFeed = new ArrayList<CEvent>();
        mylist = (ListView) findViewById(R.id.listView);

        mylist.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            public void onItemClick(AdapterView<?> arg0,View arg1, int position, long arg3) {

                Intent n = new Intent(getApplicationContext(), Detail.class);

                temp = allFeed.get(position);
                //String title = mylist.getItemAtPosition(position);
                Bundle vBundle = new Bundle();
                vBundle.putString(Detail.TITLE, temp.getTitle());
                vBundle.putString(Detail.DESC, temp.getDesc());
                vBundle.putString(Detail.PLACE, temp.getPlace());
                vBundle.putString(Detail.SDATA, temp.getSdate());
                vBundle.putString(Detail.EDATA, temp.getEdate());
                vBundle.putString(Detail.THUMB, temp.getThumbnaillink());
                n.putExtras(vBundle);

                startActivity(n);
            }
        });
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

                        JSONArray data = jsonObject.getJSONArray("data");

                        if(data != null) {
                            String[] title = new String[data.length()];
                            String[] minidesc = new String[data.length()];

                            for(int i = 0 ; i < data.length() ; i++) {
                                title[i] = data.getJSONObject(i).getString("post_title");
                                minidesc[i] = data.getJSONObject(i).getString("post_excerpt");
                                allFeed.add(new CEvent(data.getJSONObject(i).getString("post_title"),
                                        data.getJSONObject(i).getString("evcal_end_date"),
                                        data.getJSONObject(i).getString("evcal_start_date"),
                                        data.getJSONObject(i).getString("post_thumbnail"),
                                        data.getJSONObject(i).getString("post_content"),
                                        data.getJSONObject(i).getString("post_excerpt"),
                                        data.getJSONObject(i).getString("blogname_slug")));
                            }

                            final ArrayList<String> listp = new ArrayList<String>();
                            for (int i = 0; i < title.length; ++i) {
                                listp.add(title[i]);
                                //listp.add(minidesc[i]);
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