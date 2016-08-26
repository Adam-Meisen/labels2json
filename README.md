#Labels2JSON

Converts label tracks exported from [Audacity](http://www.audacityteam.org/) into JSON objects and writes them to a file.

The format of the resulting JSON is as follows:

```
{
  "labels": [
    {
      "start": 21.174000,
      "name": "Label1"
    },
    {
      "start": 21.227000,
      "end": 22.227000,
      "name": "Label2"
    },
    ...
  ]
}
```

The labels are sorted by their starting time. Note that in Audacity, labels may overlap, so the ending time of one label is not guaranteed to be less than the starting time of the next label.
