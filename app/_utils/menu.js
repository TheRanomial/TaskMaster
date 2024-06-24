import { list, check, todo, home } from "./Icons";
import HomeIcon from '@mui/icons-material/Home';
import CheckIcon from '@mui/icons-material/Check';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AssignmentIcon from '@mui/icons-material/Assignment';

const menu = [
  {
    id: 1,
    title: "All Tasks",
    icon: <HomeIcon/>,
    link: "/",
  },
  {
    id: 2,
    title: "Important!",
    icon: <ChecklistIcon/>,
    link: "/important",
  },
  {
    id: 3,
    title: "Completed!",
    icon: <CheckIcon/>,
    link: "/completed",
  },
  {
    id: 4,
    title: "Do It Now",
    icon: <AssignmentIcon/>,
    link: "/incomplete",
  },
];

export default menu;