import { ajax } from 'rxjs/ajax';

const tokenElem = document.querySelector('#csrf');
const { token: _csrf } = tokenElem.dataset;

export default (body) =>
  ajax({
    url: '/graphql',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      _csrf,
      ...body,
    },
  });
