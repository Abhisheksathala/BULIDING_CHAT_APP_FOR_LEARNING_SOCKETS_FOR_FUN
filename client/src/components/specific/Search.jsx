import React, { useEffect } from "react";
import {
  Dialog,
  Stack,
  DialogTitle,
  List,
  ListItemText,
  ListItem,
} from "@mui/material";
import InputComponent from "../InputComponent";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { Search as SearchIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

//
import UserItem from "../shared/UserItem";
import { setIsSearch } from "../../redux/reducers/misc";
import { useLazySearchUserQuery } from "../../redux/api/api";

const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const searchInput = watch("search");

  const [users, setUsers] = React.useState([
    { _id: 12, name: "abhi", avater: "httpls:googl.com" },
  ]);

  const HandleSearch = async (formdata) => {
    console.log("search", formdata);

    if (formdata.search && formdata.search.trim()) {
      try {
      const result = await searchUser(formdata.search).unwrap();
        setUsers(result.users || []);
      } catch (error) {
        console.log(error)
      }
    }
  };

  const addFriendHandler = () => {
    console.log("addFriendHandler");

    // TODO : implememt add friend logic
  };

  const isloadingSendFriendRequest = false;

  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser,{ data, isLoading, error }] = useLazySearchUserQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
     if (searchInput && searchInput.trim().length >= 3) {
        searchUser(searchInput)
          .unwrap()
          .then(({res}) => {
            setUsers(res.users || []);
          })
          .catch((err) => {
            console.log(err);
            setUsers([]);
          });
      } else {
        setUsers([]);
      }
    }, 1000);

    return () => clearTimeout(delayDebounce);

  }, [searchInput, searchUser]);

    useEffect(() => {
    if (data) {
      setUsers(data.users || []);
    }
  }, [data]);

  const handlesearchClose = () => {
    dispatch(setIsSearch(false));
  };

  return (
    <Dialog open={isSearch} onClose={handlesearchClose}>
      <Stack p="1rem" px={"1rem"} direction="column" width="25rem">
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
            {...register("search", {
              required: "Input is required to find person",
              minLength: {
                value: 3,
                message: "Minimum 3 characters required",
              },
            })}
          />
          {errors.search && (
            <p className="text-red-500 mb-4 -mt-4">{errors.search.message}</p>
          )}
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
