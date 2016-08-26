/* eslint-env node */
var fs = require('fs');
var readline = require('readline');

module.exports = {
  labels2json: labels2json,
  l2j: labels2json
};


/** JSON object to store the parsed labels in
 *  @type {Object}
*/
var labelsAsJSON = {
  /** @type {Object[]} */
  labels: [
    /* {
    start: {Number},
    end: {Number},
    name: {String}
    }*/
  ]
};
/** Label track exported from Audacity, should be a .txt. */
var inputFile = "";
/** File to write resultant json to. */
var outputFile = "";

if (process.argv.length > 2) {
  // first argument should be the exported label track
  inputFile = process.argv[2];

  // is the output file specified?
  if (process.argv.length > 3) {
    // yes
    outputFile = process.argv[3];
  } else {
    // no
    outputFile = inputFile.replace(/\.txt$/, "") + ".json";
  }

  labels2json(inputFile, outputFile);
} else {
  // if the program is run with no arguments
  console.error(`Usage: l2j <input file> [<output file>]`);
}

/** @description Parses a label track from Audacity into a JSON object.
 *  @param {String} inputFile The label track exported from Audacity. Should be a .txt file.
 *  @param {String} outputFile The file to write the converted JSON to.
 */
function labels2json(inputFile, outputFile) {
  var inputStream = fs.createReadStream(inputFile);
  var rl = readline.createInterface({
    input: inputStream
  });

  rl.on('line', line => {
    line.replace(/\n/, "");
    line = line.split('\t');

    if (line.length > 1) {
      var startTime = line[0];
      var endTime = line[1];
      var name = null;
      if (line.length > 2) name = line[2];

      labelsAsJSON.labels.push({
        'start': startTime,
        'end': endTime,
        'name': name
      });
    }
  });
  rl.on('close', () => {
    // close streams
    rl.close();
    inputStream.close();

    // sort labels
    sortLabels();

    // write JSON
    writeToFile();
  });

  inputStream.on('error', err => {
    console.log("error: The file input stream has encountered an error. No files have been written.");
    console.error(err);
    process.exit(1);
  });
}

/** Write the collected labels to a file as JSON */
function writeToFile() {
  // make sure there's something to write
  if (labelsAsJSON.labels.length > 0) {
    fs.writeFile(outputFile, JSON.stringify(labelsAsJSON, null, 2), err => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Labels written to ${outputFile}`);
      }
    });
  } else {
    console.error("Error: no labels found. File not written.");
  }
}

/** sort labels by START time */
function sortLabels() {
  /** @type {Object[]} */
  var labels = labelsAsJSON.labels;

  labels.sort((a, b) => {
    // ascending order by start time
    return parseFloat(a.start) - parseFloat(b.start);
  });
}
