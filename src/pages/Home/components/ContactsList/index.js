import PropsTypes from 'prop-types';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import arrow from '../../../../assets/icons/Arrow.svg';
import edit from '../../../../assets/icons/Edit.svg';
import trash from '../../../../assets/icons/Trash.svg';

import { Card, ListHeader } from './styles';

function ContactsList({
  filteredContacts,
  orderBy,
  onToggleOrderBy,
  onDeleteContact,
}) {
  return (
    <>
      {filteredContacts.length > 0 && (
        <ListHeader orderBy={orderBy}>
          <button type="button" onClick={onToggleOrderBy}>
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </ListHeader>
      )}

      {filteredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.categories_name && (
                <small>{contact.category.name}</small>
              )}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="edit" />
            </Link>
            <button type="button" onClick={() => onDeleteContact(contact)}>
              <img src={trash} alt="deleted" />
            </button>
          </div>
        </Card>
      ))}
    </>
  );
}

ContactsList.propTypes = {
  filteredContacts: PropsTypes.arrayOf(
    PropsTypes.shape({
      id: PropsTypes.string.isRequired,
      name: PropsTypes.string.isRequired,
      email: PropsTypes.string,
      phone: PropsTypes.string,
      category: PropsTypes.shape({
        name: PropsTypes.string,
      }),
    }),
  ).isRequired,
  orderBy: PropsTypes.string.isRequired,
  onToggleOrderBy: PropsTypes.func.isRequired,
  onDeleteContact: PropsTypes.func.isRequired,
};

export default memo(ContactsList);
