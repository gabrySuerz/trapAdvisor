package com.example.reginatojames.incaneva;

/**
 * Created by Reginato James on 12/04/2016.
 */
public class CEvent {

    String title, place, minidesc, desc, thumbnaillink, sdate, edate;

    public CEvent(String title, String edate, String sdate, String thumbnaillink, String desc, String minidesc, String place) {
        this.title = title;
        this.edate = edate;
        this.sdate = sdate;
        this.thumbnaillink = thumbnaillink;
        this.desc = desc;
        this.minidesc = minidesc;
        this.place = place;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getMinidesc() {
        return minidesc;
    }

    public void setMinidesc(String minidesc) {
        this.minidesc = minidesc;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getThumbnaillink() {
        return thumbnaillink;
    }

    public void setThumbnaillink(String thumbnaillink) {
        this.thumbnaillink = thumbnaillink;
    }

    public String getSdate() {
        return sdate;
    }

    public void setSdate(String sdate) {
        this.sdate = sdate;
    }

    public String getEdate() {
        return edate;
    }

    public void setEdate(String edate) {
        this.edate = edate;
    }
}
