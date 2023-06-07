const React = require('react')

function Index(props){
    return(
        <div>
            <h1>User page</h1>
            <ul>
            {
                    props.users.map((user)=>{
                        return(
                            <li key={user._id}>
                                <a href={`/users/${user._id}`}>{user.
                                name} is {user.email}</a>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

module.exports = Index