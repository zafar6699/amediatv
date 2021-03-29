import axios from 'axios';

// $(document).ready(function(){
//     $(".reg-button-click").click(function(){
//         alert("ok")
//         // axios.get(`${url}/posts`)
//         // .then(response => {
//         //     let users_array = response.data;
//         //     viewUsers(users_array);
//         // })
//         // .catch(err => {
//         //     console.log(err)
//         // })
//     });
// })

function registerUser(){
    alert("ok")
        // axios.get(`${url}/posts`)
        // .then(response => {
        //     let users_array = response.data;
        //     viewUsers(users_array);
        // })
        // .catch(err => {
        //     console.log(err)
        // })
}

let name = $(".modal-register-post .modal-body input[name='name']").val()
		let email = $(".modal-register-post .modal-body input[name='email']").val()
		let password = $(".modal-register-post .modal-body input[name='password']").val()
		let con_password = $(".modal-register-post .modal-body input[name='uid']").val()
