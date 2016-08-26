#Labels2JSON

Converts label tracks exported from [Audacity](http://www.audacityteam.org/) into JSON objects and writes them to a file.

The format of the resulting JSON is as follows:

```
{
  "labels": [
    {
      //point label, marks a single point in time
      "start": 21.174,
      "name": "Label1"
    },
    {
      //label over a duration, has a start and end time
      "start": 21.227,
      "end": 22.227,
      "name": "Label2"
    },
    ...
  ]
}
```

The labels are sorted by their starting time. Note that in Audacity, labels may overlap, so the ending time of one label is not guaranteed to be less than the starting time of the next label.
