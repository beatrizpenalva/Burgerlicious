import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../img/logo.png';
import ButtonSidebar from './buttonsidebar';
import Button from './buttonorderstatus';
import { SidebarStorage } from './sidebarContext';

const Header = ({ role, name }) => {
  const nameFunction = () => {
    if (role === "hall") {
      return 'Attendant'
    } else { return "Chef"}
  }

  const history = useHistory();

  function reloadPage(){ 
    window.location.reload(); 
}

  return (
    <>
      <header>
        <section>
          <div className="user-info">
            <span className="team-work">{nameFunction().toUpperCase()}:</span>{' '}
            {name.toUpperCase()}
          </div>
          <button
            className="orders-button"
            onClick={() => {
              history.push('/');
              localStorage.clear();
            }}
          >
            <span className="material-icons">logout</span>
            <span className="button-text">LOGOUT</span>
          </button>
        </section>

        <img className="logo" src={logo} alt="logo" height="116px" width="141,6px" />

        <section className="buttons">
          {role === 'kitchen' && (
            <Button
              value={'refresh'}
              id={'refresh'}
              key={'button-order-refresh'}
              className="orders-button"
              onClick={() => {
                reloadPage()
              }}
            >
              <span className="material-icons">notifications</span>
              <span className="button-text">UPDATE ORDERS</span>
            </Button>
          )}

          {role === 'hall' && (
            <SidebarStorage>
              <ButtonSidebar
                value={'ORDERS IN PROGRESS'}
                id={'processing'}
                key={'button-orderInprocess'}
                className="orders-button"
              >
                <span className="material-icons">notifications</span>
                <span className="button-text">ORDERS IN PROGRESS</span>
              </ButtonSidebar>
            </SidebarStorage>
          )}

          <SidebarStorage>
            <ButtonSidebar
              value={'FINISHED ORDERS'}
              id={'finished'}
              key={'button-orderFinished'}
              className="orders-button"
            >
              <span className="material-icons">history</span>
              <span className="button-text">FINISHED ORDERS</span>
            </ButtonSidebar>
          </SidebarStorage>
        </section>
      </header>
    </>
  );
};

export default Header;
