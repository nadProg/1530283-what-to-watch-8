import { render, screen } from '@testing-library/react';
import { lorem } from 'faker';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { FilmCardTab } from '../../constants';
import FilmCardTabs from './film-card-tabs';

const mockClassName = lorem.word();

const history = createMemoryHistory();

describe('Component: FilmCardTabs', () => {
  it('should render correctly with no props', () => {
    render(
      <Router history={history}>
        <FilmCardTabs />
      </Router>,
    );

    Object.values(FilmCardTab).forEach((tab) => {
      expect(screen.queryByText(new RegExp(tab, 'i'))).toBeInTheDocument();
    });
  });

  it('should render correctly with className props', () => {
    render(
      <Router history={history}>
        <FilmCardTabs className={mockClassName} />
      </Router>,
    );

    Object.values(FilmCardTab).forEach((tab) => {
      expect(screen.queryByText(new RegExp(tab, 'i'))).toBeInTheDocument();
    });

    expect(screen.queryByTestId('film-card-navigation')).toHaveClass(mockClassName);
  });
});
