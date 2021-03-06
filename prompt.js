/**
Copyright (c) 2017 Elizar Pepino <jupenz@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

'use strict';
// Each message should be formatted as follow:
//
// {
//   timestamp: Date.now() / 10000,
//   message: String(''),
//   username: String('')
// }
//
// Pretty basic ey?
const messages = [];

/****************************************************************************
 *
 *                            - Draw Methods -
 *
 ****************************************************************************/
const draw = (msg) => {
  // Get dimension
  const columns = process.stdout.columns;
  const rows = process.stdout.rows;

  // Get tty columns
  const filler = Array(columns)
              .fill(' ')
              .join('');

  // Get tty rows
  Array(rows - 1)
    .fill(0)
    .forEach((x, i, a) => {
      // Get the current index in reverse
      const index = a.length - 1 - i;

      // Get the message in reverse without mutating
      // the messages array
      const item = Array
        .from(messages)
        .reverse()[index];

      // Timestamped message
      if (item && item  !== -1) {
        const tt = (new Date(item.timestamp)).toLocaleTimeString();
        return console.log(`[${tt}][${item.user}] ${item.message}`);
      } else {
        // Write to standard out
        console.log(filler);
      }
    });

  process.stdout.write('\r[~] ');
}

// Draw
draw();

// read user inputs
process.stdin.on('data', (d) => {
  // Trim message
  const tm = d.toString().trim();

  // Ignore empty
  if (tm === '') return draw();

  // On quit
  if (tm.match(/^\/(quit|close|exit)/i)) process.exit(1);

  // Insert
  messages.push({
    timestamp: Date.now(),
    message: tm,
    user: 'Me'
  });

  // Re-draw
  draw();
});
