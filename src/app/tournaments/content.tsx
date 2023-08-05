'use client';
import Button from '@/components/UI/Button';
import { useEffect, useState } from 'react';
import { Title } from '@/components/UI';
import Link from 'next/link';
import { tournaments } from '@/lib/tournaments';
import Divider from '@/components/UI/Divider';
import PageSwitcherAnimation from '@/components/landing/PageSwitcherAnimation';

export const TournamentHome = ({
  animations,
  defaultTournamentId,
  onDefaultTournamentSet = () => {},
}: {
  animations: 'all' | 'none' | 'except-first';
  defaultTournamentId?: string;
  onDefaultTournamentSet?: () => void;
}) => {
  const fadeDuration = animations !== 'none' ? 200 : 0;
  //const dispatch = useAppDispatch();
  //const tournaments = useAppSelector((state) => state.tournament.tournaments);
  // This is initialized when tournaments are fetched
  const [selectedTournamentIndex, setSelectedTournamentIndex] = useState(-1);
  const [renderedTournamentIndex, setRenderedTournamentIndex] = useState(-1);
  const [lastFading, setLastFading] = useState(animations === 'all' ? Date.now() : 0);
  // Only used for force-updating the component
  const [updater, setUpdater] = useState(false);
  const [nextUrl, setNextUrl] = useState('');

  useEffect(() => {
    if (!tournaments) {
      //dispatch(fetchTournaments());
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setUpdater(!updater); // Force-update the component
    }, fadeDuration);
  }, [selectedTournamentIndex]);

  const selectTournament = (i: number, changeLastFading = true) => {
    if (i === selectedTournamentIndex) return;
    setSelectedTournamentIndex(i);
    if (changeLastFading) setLastFading(Date.now());
  };

  // Initialize the selected tournament
  if (tournaments && selectedTournamentIndex === -1) {
    if (!defaultTournamentId) {
      selectTournament(0);
    } else {
      onDefaultTournamentSet();
      selectTournament(
        tournaments.findIndex((t) => t.id === defaultTournamentId),
        false,
      );
    }
  }

  const renderedTournament = tournaments[renderedTournamentIndex];

  const fading = Date.now() - lastFading < fadeDuration;
  if (!fading && renderedTournamentIndex !== selectedTournamentIndex) {
    setRenderedTournamentIndex(selectedTournamentIndex);
    document.documentElement.style.setProperty(
      '--background-image',
      `url("${tournaments[selectedTournamentIndex].backgroundImage}")`,
    );
  }

  if (renderedTournamentIndex === -1) {
    return <div className={`tournament-container ${fading ? 'fading' : ''}`} />;
  }

  return (
    <PageSwitcherAnimation nextPage={!nextUrl ? undefined : nextUrl}>
      <div className={`tournament-container ${fading ? 'fading' : ''}`}>
        <div className="page-title">
          <Divider is_white />
          <Title align="center">Tournois</Title>
          <Divider is_white />
        </div>
        <div className="content">
          <div className="tournaments-list">
            {!tournaments
              ? 'Chargement des tournois...'
              : tournaments.map((tournament, i) => (
                  <img
                    key={tournament.id}
                    src={tournament.image}
                    alt={`Logo ${tournament.name}`}
                    className={`tournament ${i === selectedTournamentIndex ? 'selected' : ''}`}
                    onClick={() => selectTournament(i)}
                  />
                ))}
          </div>
          <div className={`tournament-info ${fading ? 'fading' : ''}`}>
            <h2>{renderedTournament.name}</h2>
            <p>
              <strong>{renderedTournament.cashprize}€</strong> de cashprize ·{' '}
              <strong>{renderedTournament.maxPlayers / renderedTournament.playersPerTeam} équipes </strong>
              <br />
            </p>
            <p>
              Casté par <strong>{renderedTournament.caster}</strong>
            </p>
            <Link href={``} scroll={false}>
              <Button onClick={() => setNextUrl(renderedTournament.id)}>Plus d'infos</Button>
            </Link>
            <Link href={`/dashboard`} scroll={false}>
              <Button primary>S'inscrire</Button>
            </Link>
          </div>
        </div>
      </div>
    </PageSwitcherAnimation>
  );
};
