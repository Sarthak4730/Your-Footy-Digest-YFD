import { Loader, MultiSelect, Avatar, Group, Text } from "@mantine/core";

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchTeams } from "../features/teams/teamsSlice.js";
import { updateFavs } from "../features/user/userSlice.js";

const SelectFavs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const {list: teams, loading} = useSelector((state) => state.teams);
  
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  // fetch teams on page load
  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  // setup to prevent dropdown breaking the page height (overflow)
  useEffect(() => {
    if (dropDownOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [dropDownOpen]);

  // setup for dropdown teams list
  const teamsOptions = teams.reduce((acc, t) => {
    const option = {
      value: t.clubName,
      label: t.clubName,
      logo: t.logo,
      league: t.league
    }
    const groupIndex = acc.findIndex((a) => a.group === t.league);
    if(groupIndex == -1) {
      acc.push({
        group: t.league,
        items: [option]
      });
    } else acc[groupIndex].items.push(option);
    return acc;
  }, []);
  const renderMultiSelectOption = ( { option } ) => {
    return <Group gap="sm">
      <Avatar src={option.logo} size={36} radius="xl"/>
      <div>
        <Text size="sm">{option.label}</Text>
      </div>
    </Group>
  };

  // setup for updating favs array
  const teamsForFavsArray = selectedTeams.map(t => {
    return teams.find((x) => x.clubName === t);
  });

  // when save button is clicked
  const handleSave = async () => {
    if(!user.id) return alert("User not found in store(authSlice)");
    try {
      const res = await dispatch( updateFavs( { userId: user.id, favs: teamsForFavsArray } ) ).unwrap();
      navigate("/fixtures");
    } catch (err) {
      console.error("Failure in updating favs array.", err);
    }
  }
  
  // loader while teams are being fetched
  if(loading) return <div className="flex justify-center h-screen items-center gap-5">
    <Loader color="#3B82F6" size={50}/>
    <h1 className="text-3xl font-bold">Loading All Teams...</h1>
  </div>

  return <div className="h-screen flex flex-col items-center justify-center gap-5">
    <h1 className="text-3xl font-bold text-center">Select All Your Favourite Teams</h1>
        
    <div className="border-3 border-blue-400 w-5/6 md:w-2/3 flex flex-col h-2/3 md:h-3/4 items-center rounded-xl justify-center overflow-visible">
      <div className={`dropdowndiv w-3/4 ${dropDownOpen ? "h-5/6" : "h-1/12"} transition-all duration-300 ease-in-out`}>
        <MultiSelect
          data={teamsOptions}
          renderOption={renderMultiSelectOption}
          
          placeholder="Search your fav clubs"
          hidePickedOptions
          searchable
          
          onDropdownOpen={() => setDropDownOpen(true)}
          rightSection={
            <div className="ml-4 pr-10">
              { dropDownOpen ? <IoIosArrowUp /> : <IoIosArrowDown /> }
            </div>
          }
          comboboxProps={
            {
              withinPortal: true,
              position: 'bottom',
              middlewares: { flip: false },
              transitionProps: { duration: 0 }
            }
          }
          onDropdownClose={() => setDropDownOpen(false)}
          onChange={setSelectedTeams}
          
          maxDropdownHeight={325}
          classNames={
            {
              input: "!max-h-48 md:!max-h-24 !overflow-y-auto !border-2 !border-blue-400 !rounded-lg !font-semibold",
              dropdown: "!border-2 !border-blue-400 !rounded-lg",
            }
          }
          styles={{
            groupLabel: {
              fontSize: 20,
              color: "#3B82F6",
            }
          }}
        />
      </div>
    </div>
    <button onClick={handleSave} className="bg-yellow-200 border-2 border-black w-1/3 md:w-1/6 h-10 rounded-2xl cursor-pointer hover:scale-110 transition"><b>Save</b></button>
  </div>
}

export default SelectFavs;