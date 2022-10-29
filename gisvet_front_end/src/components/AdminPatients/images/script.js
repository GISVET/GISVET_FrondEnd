const settings_admin = document.querySelector('.options-admin');
const options_admin = document.querySelector('.options-admin-visible');
const settings_admin_hidden = document.querySelector('.settings-hide');
const cancel_button = document.querySelector('.button_cancel');
const form_add_user = document.querySelector('.form_add_user_general');
const add_user_form = document.querySelector('.add_user_form');
const username_menu = document.querySelector('.username_menu');
const panel_username = document.querySelector('.username_option');


settings_admin.addEventListener('click',showOptions);
settings_admin_hidden.addEventListener('click',showOptionsReserve);
cancel_button.addEventListener('click',showOptionsReserve);
add_user_form.addEventListener('click',showAddUser);
username_menu.addEventListener('click',showUsernameMenu);

function showUsernameMenu(){
    console.log("Entro a verificar");
    if(panel_username.style.visibility==="visible"){
        panel_username.style.visibility = "hidden"

    }else{
        panel_username.style.visibility = "visible"
    }
}

function showOptions(){
    settings_admin.style.visibility = "hidden";
    options_admin.style.visibility = "visible";
}
function showOptionsReserve(){
    settings_admin.style.visibility = "visible";
    options_admin.style.visibility = "hidden";
}
function showAddUser(){
    form_add_user.style.visibility = "visible";
}
function hideAddUser(){
    form_add_user.style.visibility = "hidden";
}