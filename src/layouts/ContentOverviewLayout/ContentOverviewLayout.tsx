import React from 'react';
import OverviewDetaill from '../../components/OverviewDetaill';
import styles from './ContentOverviewLayout.module.css';

interface Props {
  fields: {
    key: string,
    value: string,
  }[];
}

const ContentOverviewLayout: React.FC<Props> = ({ fields }) => (
  <div className={styles.container}>
    {fields.map(field => <OverviewDetaill {...field} />)}
  </div>
);

export default ContentOverviewLayout;