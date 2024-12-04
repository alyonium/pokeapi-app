export const CARD_MODE = {
  EDIT: 'edit',
  VIEW: 'view',
};

export const ROUTE = {
  CATALOG: '/catalog',
  CARD: '/card',
  CARD_EDIT: `/card/${CARD_MODE.EDIT}`,
  CARD_VIEW: `/card/${CARD_MODE.VIEW}`,
  ERROR: '/error',
};
