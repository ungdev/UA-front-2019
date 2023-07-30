import { Button, Title } from '@/components/UI';
import constellation1 from '@/../public/images/clouds/constellation-1.png';
import constellation2 from '@/../public/images/clouds/constellation-2.png';
import constellation3 from '@/../public/images/clouds/constellation-3.png';
import cloud3 from '@/../public/images/clouds/cloud-3.png';

const TournamentsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="tournaments">
      <div className="top-container">
        <div className="top">
          <Title level={1} align={'center'}>
            Forme ton équipe et hisse-toi vers la victoire ultime dans un tournoi !
          </Title>
          <div className="text">
            Rejoins-nous dès maintenant pour vivre une expérience inoubliable, où l'amitié, la stratégie, et
            l'adrénaline se mêlent pour créer des souvenirs inégalables. C'est l'occasion parfaite de mettre en avant
            tes talents, de relever des défis palpitants et de créer des liens durables avec des coéquipiers passionnés.
          </div>
          <div className="buttons">
            <Button isPink primary>
              Découvrir les tournois
            </Button>
            <Button isPink primary>
              Se connecter
            </Button>
          </div>
        </div>
      </div>
      <div className="tournaments-content">
        <div className="background">
          <img src={constellation1.src} alt="background" className="constellation-1-1" />
          <img src={cloud3.src} alt="background" className="cloud-3" />
          <img src={constellation2.src} alt="background" className="constellation-2-1" />
          <img src={constellation2.src} alt="background" className="constellation-2-2" />
          <img src={constellation3.src} alt="background" className="constellation-3-1" />
          <img src={constellation1.src} alt="background" className="constellation-1-2" />
          <img src={constellation1.src} alt="background" className="constellation-1-3" />
          <img src={constellation3.src} alt="background" className="constellation-3-2" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default TournamentsLayout;
