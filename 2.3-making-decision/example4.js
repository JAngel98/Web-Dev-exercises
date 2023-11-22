let allStudents = [
    'A',
    'B-',
    1,
    4,
    5,
    2
  ]
  
  let studentsWhoPass = [];
  let studentsWhoPassIndex = [];

  function getStudentsWhoPass () {
    let cont = 0;

    for (let i = 0; i < allStudents.length; i++) {
        if (isNaN(allStudents[i])) {
            if (allStudents[i] !== 'C-') {
            studentsWhoPassIndex[cont] = i;
            cont++;
            }
        } else if (allStudents[i] >= 3) {
            studentsWhoPassIndex[cont] = i;
            cont++;
        }
    }

    console.log(studentsWhoPassIndex); //Is the student index

  }
  
  function getStudentsWhoPassByPush () {
    for (let i = 0; i < allStudents.length; i++) {
        if (isNaN(allStudents[i])) {
            if (allStudents[i] !== 'C-') {
            studentsWhoPass.push(allStudents[i])
            }
        } else if (allStudents[i] >= 3) {
            studentsWhoPass.push(allStudents[i])
        }
    }

    console.log(studentsWhoPass); //Is the student index

  }
  
  getStudentsWhoPass();
  getStudentsWhoPassByPush();
  