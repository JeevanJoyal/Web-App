import { useState,useRef } from "react";
import Form from "./components/Form";
import UserList from "./components/UserList";

const endPoint = "https://web-app-mock-api.onrender.com/users";
const FIELDS = [
    {
        codeName : "id" ,
        fieldName : "Id",
        fieldType : "text"
    },
    {
        codeName : "fname",
        fieldName : "First Name",
        fieldType : "text"
    },
    {
        codeName : "lname",
        fieldName : "Last Name",
        fieldType : "text"
    },
    {
        codeName : "phoneNumber",
        fieldName : "Phone Number",
        fieldType : "number"
    },
    {
        codeName : "email" ,
        fieldName : "Email",
        fieldType : "email"
    },
]

function App() {
    const [mode, setMode] = useState("Add");
    const [refresh, setRefresh] = useState(0);
    const [usersData, setUserData] = useState([]); 
    const maxID= useRef(0);
    const fieldsRefs = {};
    for (let i = 0; i < FIELDS.length; i++){
        fieldsRefs[FIELDS[i].codeName] = {
            fieldName : FIELDS[i].fieldName,
            fieldType : FIELDS[i].fieldType,
            codeName : FIELDS[i].codeName,
            // eslint-disable-next-line react-hooks/rules-of-hooks
            isInvalid : useRef(false),
            // eslint-disable-next-line react-hooks/rules-of-hooks
            ref : useRef(""),
        };
    }
    const {fname, lname, phoneNumber, email, id} = fieldsRefs;
    const fieldToRender = [id, fname, lname, phoneNumber, email];

    
    async function userGet() {
        try {
            fetch(endPoint)
            .then((data) => data.json())
            .then((data) => {
                console.log(`After getting the data from GET = ${JSON.stringify(data)}`);
                maxID.current = 0;
                data.forEach((ele) => {maxID.current = Math.max(maxID.current, ele.id)})
                setUserData(data);
            })
        } catch (error) {
            console.log("Some error occur while fetching users" + error.message);
        }
        
    }
    async function userPost(formData) {
        try {
            fetch(endPoint, {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then((res) => res.json())
            .then((jsondata) => {
                console.log(jsondata);
                console.log(maxID);
                userGet();
            });
        } catch (error) {
            console.log("Some error occur while posting user" + error.message);
        }
        
    }

    async function userPut(id, formData) {
        try {
            fetch(endPoint + `/${id}`, {
                method: "PUT",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then((res) => res.json())
            .then((jsondata) => {
                console.log(jsondata);
                console.log(maxID);
                userGet();
            });
        } catch (error) {
            console.log("Some error occur while putting user" + error.message);
        }
        
    }
    
    async function userDelete(id) {
        try {
            fetch(endPoint + `/${id}`, {
                method : "DELETE"
            }).then((res) => {
                console.log(res);
                userGet();
            })
        } catch (error) {
            console.log("Some error occur while deleting user" + error.message);
        }
        
    }


    return (<div className="flex flex-col justify-center gap-3 items-center w-full h-full">
        <Form 
            maxID={maxID} 
            userPost={userPost} 
            userPut={userPut} 
            mode={mode} 
            setMode={setMode}
            fieldsRefs={fieldsRefs}
            fieldToRender={fieldToRender}
        />
        <UserList 
            refresh={refresh} 
            setRefresh={setRefresh} 
            usersData={usersData} 
            userGet={userGet} 
            userDelete={userDelete} 
            setMode={setMode} 
            fieldsRefs={fieldsRefs}
            fieldToRender={fieldToRender}
        />
    </div>
    );
}

export default App;
