'use client';
import styles from './not-found.module.scss';
import Link from 'next/link';

import { Title, Button } from '@/components/UI';

export default function NotFound() {
  return (
    <>
      <div id="not-found" className={styles.notFound}>
        <Title level={1} type={1} align="center">
          Erreur 404
        </Title>
        <p>
          La page <span>{window.location.pathname}</span> n’existe pas.
          <br />
          <br />
          Si tu penses que c’est une erreur, contacte le staff
        </p>

        <div className={styles.buttons}>
          <Link href="/">
            <Button primary>Retour à l'accueil</Button>
          </Link>
          {document.referrer !== window.location.href && (
            <Link href={document.referrer}>
              <Button primary>Retour à la page précédente</Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
