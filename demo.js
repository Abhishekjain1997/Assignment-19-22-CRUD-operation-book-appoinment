document.addEventListener('DOMContentLoaded', () => {
    //loadStoredData();
    axios.get("https://crudcrud.com/api/fa965dba465c43f78b1bd210cbee5369/ap")
    .then((response) => {
        console.log(response);
        for(var i=0;i<response.data.length;i++){
            showuseronscreen(response.data[i]);
        }
    })
    .catch((err)=>{
        console.log(err);
    });
});

function savetocloud(event) {
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.emailid.value;
    const phonenumber = event.target.phonenumber.value;

    const obj = {
        name,
        email,
        phonenumber
    };

    axios.post("https://crudcrud.com/api/fa965dba465c43f78b1bd210cbee5369/ap", obj)
       .then((response)=>{
            showuseronscreen(response.data);
       })
       .catch((err)=>{
            document.body.innerHTML=document.body.innerHTML + "<h4>Something is wrong</h4>"
            console.log(err)
       })
}

function showuseronscreen(obj) {
    const parentElem = document.getElementById('Listofusers');
    const childelem = document.createElement('li');
    childelem.textContent = obj.name + '-' + obj.email + '-' + obj.phonenumber;

    const deletebutton = document.createElement('input');
    deletebutton.type = "button";
    deletebutton.value = 'Delete';
    deletebutton.onclick = () => {
        axios.delete(`https://crudcrud.com/api/fa965dba465c43f78b1bd210cbee5369/ap/${obj._id}`)
        .then(() => {
            parentElem.removeChild(childelem);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    childelem.appendChild(deletebutton);

    const editbutton = document.createElement('input');
    editbutton.type = "button";
    editbutton.value = 'Edit';
    editbutton.onclick = () => {
        axios.delete(`https://crudcrud.com/api/fa965dba465c43f78b1bd210cbee5369/ap/${obj._id}`)
        .then(() => {
            document.getElementById('usernameInputTag').value = obj.name;
            document.getElementById('emailInputTag').value = obj.email;
            document.getElementById('phonenumberInputTag').value = obj.phonenumber;
            
            parentElem.removeChild(childelem);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    childelem.appendChild(editbutton);
    parentElem.appendChild(childelem);
}

