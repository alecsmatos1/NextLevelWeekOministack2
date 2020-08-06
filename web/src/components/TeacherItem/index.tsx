import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem(){
    return(
        <article className="teacher-item">
        <header>
            <img src="https://avatars3.githubusercontent.com/u/60899099?s=460&u=d39a6b323e33d396b70c63230aaffd925c300b22&v=4" alt="Alecsander Matos"/>
           <div>
            <strong>Alecsander Matos</strong>
            <span>Direito</span>
            </div>
        </header>
        <p>
            Apaixonado em direito e um grande lutador em prol das causas Raciais.
        </p>

        <footer>
            <p>
            Preço/Hora
            <strong>R$ 80,00</strong>
            </p>
            <button type="button">
                <img src={whatsappIcon} alt="Whatsapp" />
                Entrar em contato.
            </button>
            
        </footer>
        </article>
    )
}
export default TeacherItem;
