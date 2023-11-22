let allStudents = [
    'A',
    'B-',
    1,
    4,
    5,
    2
  ]
  
  let studentsWhoPass = [];

  function getStudentsWhoPass () {
    let cont = 0;

    for (let i = 0; i < allStudents.length; i++) {
        if (allStudents[i] >= 3 || allStudents[i] !== 'C-') {
            studentsWhoPass[cont] = i;
            cont++;
        }
    }

    console.log(studentsWhoPass);

  }
  
  getStudentsWhoPass();
  