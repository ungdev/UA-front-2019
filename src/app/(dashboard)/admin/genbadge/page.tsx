'use client';
import { Button, Icon, Input, Select, Title } from '@/components/UI';
import styles from './style.module.scss';
import { useEffect, useState } from 'react';
import { IconName } from '@/components/UI/Icon';
import { generateBadges } from '@/modules/admin';
import { Badge, BadgePermission, BadgeType, Commission } from '@/types';
import { API } from '@/utils/api';

const GenBadges = () => {
  const [fields, setFields] = useState<Badge[]>([{ type: 'orgas' }]);

  const [commissions, setCommissions] = useState<Commission[]>([]);

  const addBadgeField = () => {
    setFields([...fields, { type: 'orgas' }]);
  };

  useEffect(() => {
    API.get('commissions').then(setCommissions);
  }, []);

  return (
    <form
      className={styles.genbadges}
      onSubmit={(e) => {
        e.preventDefault();
        generateBadges(fields);
      }}>
      <div className={styles.titleContainer}>
        <Title level={2} gutterBottom={false}>
          Badge Generator
        </Title>
        <div>
          <Button primary onClick={addBadgeField}>
            Ajouter un champ
          </Button>
        </div>
      </div>

      <div className={styles.formContainer}>
        {Array.from(Array(fields.length).keys()).map((i) => (
          <div key={`field-${i}`} className={styles.field}>
            <Select
              label="Type"
              value={fields![i]?.type}
              onChange={(e) => {
                const newFields = [...fields!];

                if (e === 'orgas' || e === 'single') {
                  newFields[i] = { type: e as BadgeType };
                } else if (e === 'singlecustom') {
                  newFields[i] = { type: e as BadgeType, commissionId: commissions[0].id, commissionRole: 'member' };
                } else {
                  newFields[i] = { type: e as BadgeType, permission: 'restricted' };
                }

                setFields(newFields);
              }}
              options={[
                { label: 'Orgas', value: 'orgas' },
                { label: 'Custom', value: 'custom' },
                { label: 'Single orga', value: 'single' },
                { label: 'Single custom', value: 'singlecustom' },
              ]}
              required
            />

            {fields![i]?.type === 'custom' && (
              <>
                <Input
                  label="Nom"
                  value={fields![i]?.name}
                  onChange={(e) => {
                    const newFields = [...fields!];
                    newFields[i] = { ...newFields[i], name: e };
                    setFields(newFields);
                  }}
                  required
                />
                <Select
                  label="Permissions"
                  value={fields![i]!.permission ?? ''}
                  onChange={(e) => {
                    const newFields = [...fields!];
                    newFields[i] = { ...newFields[i], permission: e as BadgePermission };
                    setFields(newFields);
                  }}
                  options={[
                    { label: 'Restreint', value: 'restricted' },
                    { label: 'Organisateur', value: 'orgaprice' },
                    { label: 'Accès total', value: 'fullaccess' },
                    { label: 'Invité', value: 'invite' },
                  ]}
                  required
                />
                <Input
                  label="Quantité"
                  type="number"
                  value={fields![i]?.quantity}
                  onChange={(e) => {
                    const newFields = [...fields!];
                    newFields[i] = { ...newFields[i], quantity: parseInt(e) };
                    setFields(newFields);
                  }}
                  required
                />
              </>
            )}

            {fields![i]?.type === 'single' && (
              <Input
                label="Email"
                value={fields![i]?.email}
                onChange={(e) => {
                  const newFields = [...fields!];
                  newFields[i] = { ...newFields[i], email: e };
                  setFields(newFields);
                }}
                required
              />
            )}

            {fields![i]?.type === 'singlecustom' && (
              <>
                <Input
                  label="Nom"
                  value={fields![i]?.lastname}
                  onChange={(e) => {
                    const newFields = [...fields!];
                    newFields[i] = { ...newFields[i], lastname: e };
                    setFields(newFields);
                  }}
                  required
                />
                <Input
                  label="Prénom"
                  value={fields![i]?.firstname}
                  onChange={(e) => {
                    const newFields = [...fields!];
                    newFields[i] = { ...newFields[i], firstname: e };
                    setFields(newFields);
                  }}
                  required
                />
                <Input
                  label="Commission"
                  value={fields![i]?.commissionId ?? ''}
                  onChange={(e) => {
                    const newFields = [...fields!];
                    newFields[i] = { ...newFields[i], commissionId: e };
                    setFields(newFields);
                  }}
                  required
                />
                <Select
                  label="Permissions"
                  value={fields![i]?.permission ?? ''}
                  onChange={(e) => {
                    const newFields = [...fields!];
                    newFields[i] = { ...newFields[i], permission: e as BadgePermission };
                    setFields(newFields);
                  }}
                  options={[
                    { label: 'Aucune', value: '' },
                    { label: 'Restreint', value: 'restricted' },
                    { label: 'Organisateur', value: 'orgaprice' },
                    { label: 'Accès total', value: 'fullaccess' },
                    { label: 'Invité', value: 'invite' },
                  ]}
                  required
                />
                <Input
                  label="Image"
                  value={fields![i]?.image ?? ''}
                  onChange={(e) => {
                    const newFields = [...fields!];
                    newFields[i] = { ...newFields[i], image: e };
                    setFields(newFields);
                  }}
                />
                <Input
                  label="Place"
                  value={fields![i]?.place}
                  onChange={(e) => {
                    const newFields = [...fields!];
                    newFields[i] = { ...newFields[i], place: e };
                    setFields(newFields);
                  }}
                />
              </>
            )}

            <Button
              primary
              onClick={() => {
                const newFields = [...fields!];
                newFields.splice(i, 1);
                setFields(newFields);
              }}>
              <Icon name={IconName.Trash} className={styles.trashIcon} />
            </Button>
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <Button primary type="submit">
          Générer les badges
        </Button>
      </div>
    </form>
  );
};

export default GenBadges;
