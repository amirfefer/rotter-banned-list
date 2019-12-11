/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import { blue } from '@material-ui/core/colors';
import { selectLast, selectTop } from '../../selectors';
import { RECENT_BLOCK } from '../../common/consts';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});
const Modal = ({
  show, toggleModal, title, users,
}) => {
  const dispatch = useDispatch();
  const handleListItemClick = (user) => {
    toggleModal(false);
    dispatch({ type: 'UPDATE_USER', payload: user });
  };
  const classes = useStyles();

  return (
    <Dialog
      onBackdropClick={() => toggleModal(false)}
      aria-labelledby="simple-dialog-title"
      open={show}
    >
      <DialogTitle id="top-user-dialog">{title}</DialogTitle>
      <List>
        {users && users.map((user) => (
          <ListItem button onClick={() => handleListItemClick(user)} key={user}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default Modal;

const TopModal = (props) => {
  const users = useSelector(selectTop);
  return <Modal users={users} {...props} />;
};

const RecentModal = (props) => {
  const users = useSelector(selectLast);
  return <Modal users={users} {...props} />;
};

export const ModalHOC = (props) => (props.title === RECENT_BLOCK
  ? <RecentModal {...props} />
  : <TopModal {...props} />);
