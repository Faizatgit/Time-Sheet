const exp = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = exp();
const path = require('path');
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json( { limit : '5mb' } ));

const filePath = path.join(__dirname, 'data', 'timesheet.txt');
const filepath1 = path.join(__dirname, 'data' , 'timesheet1.txt');
app.post('/timesheet', (req, res) => {
    const { employee, date, hoursWorked, reportingManager, rating } = req.body;
    if (!employee || !date || !hoursWorked || !reportingManager) return  res.sendStatus(400);
    const timesheet = `Employee Name: ${employee}, Date: ${date}, Hours Worked: ${hoursWorked}, Reporting Manager: ${reportingManager}, Rating ${rating}\n`;

    fs.appendFileSync(filePath, timesheet, (err) => {
        if (err) {
            console.error("Error in writing to file");
            res.status(500).json({ message: 'An error occurred while saving into file' });
        } else {
            console.log('Time sheet data saved successfully');
            res.status(200).json({ message: 'Time sheet data saved successfully' });
        }
    });
});

app.get('/employees', (req, res) => {
    // Read employees from JSON file
    fs.readFile('employees.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error reading file');
            return;
        }

        const employees = JSON.parse(data);
        res.json(employees);
    });
});

app.post('/rating', (req, res) => {
    const { employee, rating } = req.body;
    // if (!employee || !rating) return res.sendStatus(400);
    const ratingData = `Employee: ${employee}, Rating: ${rating}\n`;

    fs.appendFile(filepath1, ratingData, (err) => {
        if (err) {
            console.error("Error in writing rating data to file");
            return res.status(500).json({ message: 'An error occurred while saving rating data' });
        }
        console.log('Rating data saved successfully');
        res.status(200).json({ message: 'Rating data saved successfully' });
    });
});
app.listen(3000, () => {
    console.log("Server started at port 3000! ");
});