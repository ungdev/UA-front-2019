import { setLoginModalVisible } from '@/modules/loginModal';
import Button from './UI/Button';
import Link from 'next/link';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Action } from '@reduxjs/toolkit';
import { Modal } from './UI';
import LoginModal from './landing/LoginModal';
import ResetModal from './ResetModal';

/**
 * Navbar component that displays a navigation bar with links to different pages.
 * @returns JSX.Element
 */
export default function Navbar() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const dispatch = useAppDispatch();

  const isLoginAllowed = useAppSelector((state) => state.settings.login);
  const isVisible = useAppSelector((state) => state.loginModal.visible);

  const closeBurger = () => {
    if (!isBurgerOpen) return;
    setIsBurgerOpen(false);
  };

  const leftContent = (
    <>
      <Link href="/" onClick={closeBurger}>
        <Button className="home">Accueil</Button>
      </Link>
      <Link href="/event" onClick={closeBurger}>
        <Button className="event">Événement</Button>
      </Link>
      <Link href="/tournaments" onClick={closeBurger}>
        <Button className="tournament">Tournois</Button>
      </Link>
      <Link href="/help" onClick={closeBurger}>
        <Button className="help">Aide</Button>
      </Link>
    </>
  );

  const rightContent = (
    <>
      <Link href="/about" onClick={closeBurger}>
        <Button className="about">A propos</Button>
      </Link>

      <Button primary className="connection" onClick={() => dispatch(setLoginModalVisible(true) as unknown as Action)}>
        Connexion
      </Button>
    </>
  );

  return (
    <>
      <nav>
        <div className="left">{leftContent}</div>
        <div className="right">
          {rightContent}

          <div className="burger-container">
            <div className={'burger ' + (isBurgerOpen ? 'open' : '')} onClick={() => setIsBurgerOpen(!isBurgerOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div className={'burger-menu-content ' + (isBurgerOpen ? 'open' : '')}>
          {leftContent}
          {rightContent}
        </div>
      </nav>

      {isLoginAllowed ? (
        <LoginModal isVisible={isVisible} />
      ) : (
        <Modal
          title="Connexion"
          onCancel={() => dispatch(setLoginModalVisible(false) as unknown as Action)}
          visible={isVisible}
          buttons={
            <Button primary onClick={() => dispatch(setLoginModalVisible(false) as unknown as Action)}>
              Fermer
            </Button>
          }>
          Les inscriptions ouvriront bientôt !
        </Modal>
      )}
    </>
  );
}