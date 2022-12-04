//=====Importaciones de React ====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de componentes generales ====
import { Modal } from "../../../GeneralComponents/Modal";
import AdminUser from "../AddUser";
import AssignDependency from "../../AdminDependencies/AssignDependency";
import ShowUsersReports from "../ShowUsersReports/ShowUserReports";
import MessageConfirm from "../../../GeneralComponents/MessageConfirm";

//=====Importaciones de hooks ====
import { useUsersAdmin } from "../../../../hooks/AdminHooks/UsersHooks/useAdminUsers";
import { useAdminOneUser } from "../../../../hooks/AdminHooks/UsersHooks/useAdminOneUser";

//=====Importaciones de imagenes ====
import icon_Settings from "./images/Icon_Settings.png";
import icon_Add_User from "./images/Icon_Add_User.png";
import icon_asign_dependencie from "./images/Icon_pase_seguridad.png";
import icon_reports from "./images/Icon_Reports.png";

//=====Importaciones de enrutamiento ====
import { useLocation } from "wouter";

export default function SettingsAdminUser() {
    const [activeMenu, setActiveMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [childModal, setchildModal] = useState( < > < />);
            const [, navigate] = useLocation();
            const { loading, addUser, assignDependency } = useUsersAdmin();

            const setVisibleMenu = async(event) => {
                event.preventDefault();
                activeMenu ? setActiveMenu(false) : setActiveMenu(true);
            };

            const showAddUserMenu = async(event) => {
                event.preventDefault();
                setShowModal(true);
                setchildModal( <
                    AdminUser onClose = { handleCloseModal }
                    onSubmit = { onsubmitAddUser }
                    />
                );
            };

            const showAssignMenu = async(event) => {
                event.preventDefault();
                setShowModal(true);
                setchildModal( <
                    AssignDependency onClose = { handleCloseModal }
                    onSubmit = { onsubmitAssignDependency }
                    />
                );
            };

            const showReports = async(event) => {
                event.preventDefault();
                setShowModal(true);
                setchildModal( <
                    ShowUsersReports onClose = { handleCloseModal }
                    onSubmit = { onsubmitAssignDependency }
                    />
                );
            };

            const handleCloseModal = () => {
                setShowModal(false);
            };

            const onsubmitAddUser = (dataForm) => {
                addUser(dataForm).then((res) => {
                    setchildModal( <
                        MessageConfirm onClose = { handleCloseModal }
                        isCorrect = { res.status == 200 ? true : false }
                        message = { res.message }
                        />
                    );

                    return setShowModal(true);
                });
            };

            const onsubmitAssignDependency = (dataForm) => {
                assignDependency(dataForm).then((res) => {
                    setchildModal( <
                        MessageConfirm onClose = { handleCloseModal }
                        isCorrect = { res.status == 200 ? true : false }
                        message = { res.message }
                        />
                    );

                    return setShowModal(true);
                });
            };

            if (!activeMenu) {
                return ( <
                    div className = { styles.options_admin } >
                    <
                    input type = "image"
                    onClick = { setVisibleMenu }
                    src = { icon_Settings }
                    width = "45"
                    height = "45" /
                    >
                    <
                    /div>
                );
            } else {
                return ( <
                    >
                    <
                    div className = { styles.options_admin_visible } >
                    <
                    input className = { styles.settings_hide }
                    type = "image"
                    onClick = { setVisibleMenu }
                    src = { icon_Settings }
                    width = "45"
                    height = "45" /
                    >

                    <
                    div className = { styles.item_floatMenu } >
                    <
                    input className = { styles.add_user_form }
                    type = "image"
                    onClick = { showAddUserMenu }
                    src = { icon_Add_User }
                    width = "45"
                    height = "45" /
                    >

                    <
                    p > Agregar < /p> <
                    /div>

                    <
                    div className = { styles.item_floatMenu } >
                    <
                    input className = { styles.add_user_form }
                    type = "image"
                    onClick = { showAssignMenu }
                    src = { icon_asign_dependencie }
                    width = "45"
                    height = "45" /
                    >

                    <
                    p > Assignar < /p> <
                    /div>

                    <
                    div className = { styles.item_floatMenu } >
                    <
                    input className = { styles.add_user_form }
                    type = "image"
                    onClick = { showReports }
                    onClose = { handleCloseModal }
                    src = { icon_reports }
                    width = "40"
                    height = "40" /
                    >

                    <
                    p > Reportes < /p> <
                    /div> <
                    /div> {
                        showModal && < Modal > { childModal } < /Modal>} <
                            />
                    );
                }
            }