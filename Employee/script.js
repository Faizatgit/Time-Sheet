let btn = document.getElementById( 'btn' );
btn.addEventListener('click', () => {
    let employee = document.getElementById("employee").value;
    let data = document.getElementById("date").value;
    let hoursWorked = document.getElementById("hoursWorked").value;
    let reportingManager = document.getElementById("reportingManager").value;
    let rating = document.getElementById("rating").value;

    console.log('Button Clicked');
    console.log("employee");
    fetch('http://localhost:3000/timesheet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "employee": employee,
            "date": data,
            "hoursWorked": hoursWorked,
            "reportingManager": reportingManager,
            "rating": rating
        })
    })
        .then(response => response.json()
            .then(data => {
                if (!response.ok) {
                    throw new Error(data.statusText);
                }
                // console.log('Before Alert');
                alert(data.statusText);
                // console.log('After Alert');

                document.getElementById("employee").value = "";
                document.getElementById("data").value = "";
                document.getElementById("hoursWorked").value = "";
                document.getElementById("reportingManager").value = "";
                document.getElementById("rating").value = "";
            })
        )
        .catch(error => console.error('Error: ', error.statusText));
});
