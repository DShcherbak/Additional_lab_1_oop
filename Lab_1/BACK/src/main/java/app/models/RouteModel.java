package app.models;

public class RouteModel {
    public int routeId;
    public Object[] stops;
    public String startTime;
    public String endTime;
    public int interval;
    public int type;
    public Object[] timetable;

    public RouteModel(int _id, Object[] _stops, String _startTime, String _endTime, int _interval, int _type, Object[] _timetable){
        routeId = _id;
        stops = _stops;
        startTime = _startTime;
        endTime = _endTime;
        interval = _interval;
        type = _type;
        timetable = _timetable;
    }
}
