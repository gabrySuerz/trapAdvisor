package com.example.reginatojames.incaneva;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.method.ScrollingMovementMethod;
import android.widget.ImageView;
import android.widget.TextView;
import com.squareup.picasso.Picasso;


public class Detail extends AppCompatActivity {

    String title, desc, place, datain, datafin, urlThumb;
    public static final String TITLE = "title";
    public static final String DESC = "descrizione";
    public static final String SDATA = "start date";
    public static final String EDATA = "end date";
    public static final String THUMB = "thumbnail";
    public static final String PLACE = "place";

    TextView d, t, sd, ed, pl;
    ImageView th;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail);

        d = (TextView)findViewById(R.id.desc);
        t = (TextView)findViewById(R.id.title);
        sd = (TextView)findViewById(R.id.sdate);
        ed = (TextView)findViewById(R.id.edate);
        pl = (TextView)findViewById(R.id.place);
        th = (ImageView)findViewById(R.id.imageView);

        Bundle vBundle = getIntent().getExtras();
        if(vBundle!=null){
            title = vBundle.getString(TITLE);
            desc = vBundle.getString(DESC);
            place = vBundle.getString(PLACE);
            datain = vBundle.getString(SDATA);
            datafin = vBundle.getString(EDATA);
            urlThumb = vBundle.getString(THUMB);
        }

        t.setText(title);
        d.setText(android.text.Html.fromHtml(desc).toString());
        sd.setText(datain);
        ed.setText(datafin);
        pl.setText(place);

        d.setMovementMethod(new ScrollingMovementMethod());

        Picasso.with(getApplicationContext()).load(urlThumb).into(th);

    }
}
