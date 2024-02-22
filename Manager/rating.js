fetch('http://localhost:3000/employees')
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById("employeeSelect");
        data.forEach(employee => {
            const option = document.createElement("option");
            option.value = employee.id;
            option.textContent = employee.name;
            select.appendChild(option);
        });
    })
    .catch(error => console.error('Error fetching employees: ', error));

    let btn = document.getElementById("submitRating");
btn.addEventListener("click", () => {
    const employeeId = document.getElementById("employeeSelect").value;
    const rating = document.getElementById("rating").value;
    console.log(rating);
    console.log(employeeId);
    if (rating && rating >= 1 && rating <= 5) {
    
        fetch('http://localhost:3000/rating', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                employeeId: employeeId,
                rating: rating
            })
        })
        .then(response => response.json()
             .then(data => {
                if (!response.ok) {
                    throw new Error('Error submitting rating');
                }
                else {
                    alert("Please enter a valid rating between 1 and 5");
                }
                alert('Rating submitted successfully');
             })
        )
             .catch(error => console.error('Error submitting rating: ', error))
    
}
});
