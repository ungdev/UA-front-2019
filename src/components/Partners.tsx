'use client';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';
import { fetchPartners, PartnersAction } from '@/modules/partners';
import { Partner } from '@/types';
import { type Action } from '@reduxjs/toolkit';
import { getPartnerLogoLink } from '@/utils/uploadLink';

/**
 * Renders a list of partners with their logos as clickable links.
 * @returns JSX.Element
 */
export default function Partners() {
  const dispatch = useAppDispatch();
  const partners = useAppSelector((state) => (state.partners as PartnersAction).partners);

  useEffect(() => {
    if (!partners) {
      dispatch(fetchPartners as unknown as Action);
    }
  }, []);

  return (
    <div className="partners">
      {!partners
        ? 'Chargement des partenaires...'
        : partners?.map((partner: Partner, i: number) => (
            <a key={i} href={partner.link}>
              <img src={getPartnerLogoLink(partner.id)} alt={`Logo ${partner.name}`} />
            </a>
          ))}
    </div>
  );
}
