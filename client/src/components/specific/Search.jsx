import React from 'react';
import { Dialog, Stack, DialogTitle, List, ListItemText, ListItem } from '@mui/material';
import InputComponent from '../InputComponent';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import { Search as SearchIcon } from '@mui/icons-material';

//
import UserItem from '../shared/UserItem';

const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [users, setUsers] = React.useState([{ _id: 12, name: 'abhi', avater: 'httpls:googl.com' }]);

  const HandleSearch = (data) => {
    console.log('searched', data); // This will log the search input
  };

  const addFriendHandler = () => {
    console.log('addFriendHandler');
  };

  const isloadingSendFriendRequest = false;

  return (
    <Dialog open>
      <Stack p="1rem" px={'1rem'} direction="column" width="25rem">
        <DialogTitle className="text-gray-400" textAlign="center">
          Find People
        </DialogTitle>
        <form onSubmit={handleSubmit(HandleSearch)}>
          <label className="text-gray-400 py-2" htmlFor="search">
            Find The Right Person
          </label>
          <InputComponent
            icon={<SearchIcon />}
            id="search"
            type="text"
            name="search"
            containerclass="rounded-lg"
            className="px-2 py-2   outline-0"
            {...register('search', { required: 'Input is required to find person' })}
          />
          {errors.search && <p className="text-red-500 mb-4 -mt-4">{errors.search.message}</p>}
          <Button type="submit" title="Search" customclass="text-white" />
        </form>
        <List>
          {users && users?.length > 0 ? (
            <>
              {users.map((i) => {
                return (
                  <>
                    <UserItem
                      user={i}
                      key={i._id}
                      handler={addFriendHandler}
                      handlerIsLoading={isloadingSendFriendRequest}
                    />
                  </>
                );
              })}
            </>
          ) : (
            <>
              <p>nothing</p>
            </>
          )}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
