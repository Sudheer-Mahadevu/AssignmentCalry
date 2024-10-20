/**
 * merges overlapping or consecutive booking times
 * @param bookings an array of 2-tuples containing the start and end time of each booking
 * @returns an array of 2-tuples that are non-overlapping denoting start and end time
 */
function optimizeBookings(bookings:number [][]) : number[][] {
    /*
    1. Sort bookings according to start time
    2. Initialise start time of the meeting
    3. End time of overlapping intervals is the max end time in all those intervals
    4. If no overlap found, add such interval to the mergedBookings
     */


    function compare(booking1:number[],booking2 :number[]){
        return booking1[0]-booking2[0];
    }

    let  n = bookings.length;       // initialisation
    let mergedBookings:number [][] = [];
    if(n == 0) return bookings;

    let bookingsLoc = bookings.slice();  // 1.
    let bookingsSorted: number [][] = bookingsLoc.sort(compare)

    let start = bookingsSorted[0][0],end = bookingsSorted[0][1];  // 2.
    for(let i=0;i<n-1;i++){
        end = Math.max(end,bookingsSorted[i][1])                  // 3.
        if(end < bookingsSorted[i+1][0]){                         // 4.
            mergedBookings.push([start,end])
            start = bookingsSorted[i+1][0];
        }
    }
    end = Math.max(end,bookingsSorted[n-1][1]);
    mergedBookings.push([start,end]);

    return mergedBookings;

}

/*        TESTING          */ 

let tests: number [][][] = [];
let expected_outputs: number[][][] = [];
let test_desc: string[] = [];

// Test Scenarios:

test_desc[0] = "empty"
tests[0] = [];  // empty
expected_outputs[0] = [];

test_desc[1] = "non-overlapping"
tests[1] = [[1,2],[11,12],[4,10]] // non-overlapping
expected_outputs[1] = [[1,2],[4,10],[11,12]]

test_desc[2] = "non-overlapping + repeating"
tests[2] = [[1,2],[11,12],[11,12]] // non-overlapping + repeating
expected_outputs[2] = [[1,2],[11,12]]

test_desc[3] = "consecutive"
tests[3] = [[1,2],[2,3],[3,4]] // consecutive
expected_outputs[3] = [[1,4]]

test_desc[4] = "overlapping + unsorted"
tests[4] = [[1,5],[4,6],[3,9]] // overlapping + unsorted
expected_outputs[4] = [[1,9]]

test_desc[5] = "consecutive + overlapping + unsorted"
tests[5] = [[1,5],[4,6],[3,9],[6,7]] // consecutive + overlapping + unsorted
expected_outputs[5] = [[1,9]]

test_desc[6] = "miscellaneous"
tests[6] = [
    [ 5, 17 ],  [ 15, 22 ],
    [ 21, 22 ], [ 8, 13 ],
    [ 18, 20 ], [ 21, 21 ],
    [ 0, 4 ],   [ 17, 17 ],
    [ 9, 20 ],  [ 20, 20 ]
  ];

expected_outputs[6] = [[0,4],[5,22]]


test_desc[7] = "1000 random arrays with bookings of the form [a,b], a>b, 0<=a,b<=24;"
tests[7] = Array.from(Array(1000),()=> new Array(2).fill(0)) // random arrays with bookings of the form [a,b], a>b, 0<=a,b<=24;
for(let i=0;i<1000;i++){
    let a = Math.floor(Math.random()*24.9); // a is between 0 and 24
    let b = Math.floor(Math.random()*(24.9-a)) + a; // b >= a and <= 24
    tests[7][i] = [a,b]; 
}

expected_outputs[7] = [[0,24]] //!Mostly



// Outputs:
let ts= Date.now()
for(let i=0;i<8;i++){
    let output = optimizeBookings(tests[i]);
    console.log("test description "+(i+1)+": "+test_desc[i])
    console.log("input")
    console.log(tests[i])
    console.log("expected:")
    console.log(expected_outputs[i]);
    console.log("received:")
    console.log(output);
    console.log("    ")
}

let tf = Date.now();
console.log(tf-ts+" ms")