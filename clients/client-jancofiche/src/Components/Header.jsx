import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faPlus, faHouse, faDumbbell, faList } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";

import './Header.css'



function Header () {
    return (
        <>
            <header>
                <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
                >
                    <button>
                        <FontAwesomeIcon icon={faHouse} />
                    </button>
                </NavLink>

                <NavLink
                to="/creer-fiche"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
                >
                    <button>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </NavLink>

                <NavLink
                to="/liste"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
                >
                    <button>
                        <FontAwesomeIcon icon={faList} />
                    </button>
                </NavLink>
                
                <NavLink
                to="/entrainement"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
                >
                    <button>
                        <FontAwesomeIcon icon={faDumbbell} />
                    </button>
                </NavLink>
                <NavLink
                to="/config"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
                >
                    <button>
                        <FontAwesomeIcon icon={faGear} />
                    </button>
                </NavLink>
            </header>
        </>
    )
}

export default Header