/* eslint-disable react/prop-types */
import { useEffect } from "react"

export default function UserList({refresh, setRefresh, usersData, userGet, userDelete, setMode, fieldsRefs, fieldToRender}) {    
    useEffect(() => {userGet();},[]);

    function handleEdit(user) {
        // eslint-disable-next-line no-unused-vars
        Object.entries(fieldsRefs).forEach((field) =>  {
            field[1].ref.current = user[field[1].codeName] || "";
        });
        setMode("Update");
        setRefresh(refresh + 1);
    }

    if (usersData.length) {return (
        <table className="table w-[70%] table-dark table-striped table-hover">
            <thead>
                <tr>
                    {fieldToRender.map((field, idx) => {
                        return <th key={idx} scope="col">{field.fieldName}</th>;
                    })}
                    <th scope="col"><strong>Edit</strong></th>
                    <th scope="col"><strong>Delete</strong></th>
                </tr>
            </thead>
            <tbody>
                {usersData.map((user) => (
                <tr key={user.id}>
                    {fieldToRender.map((field) => (
                        <td key={`${user.id}-${field.fieldName}`}>
                            {user[field.codeName]}
                        </td>
                    ))}
                    <td>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            className="hover:text-green-600"
                            onClick={() => handleEdit(user)}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M12 20h9"/>
                            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                        </svg>
                    </td>
                    <td>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        className="hover:text-red-600"
                        onClick={() => userDelete(user.id)}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14H6L5 6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                            <path d="M9 6V4h6v2" />
                        </svg>
                    </td>
                </tr>
                
                ))}
            </tbody>
        </table>
    )}

    return <div>No Data</div>
}
