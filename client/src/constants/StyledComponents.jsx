import { styled } from "@mui/material";
import Button from "@mui/material/Button";

export const InputBox = styled("input")`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 3rem;
  border-radius: 1.5rem;
  background-color: #f5f5f5;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    background-color: white;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
`;

export const SearchField = styled("input")`
  width: 20vmax;
  border: none;
  outline: none;
  padding: 1rem 3rem 1rem 4rem;
  border-radius: 1.5rem;
  background-color: #f1f1f1;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:focus {
    background-color: white;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

export const CurvedButton = styled(Button)`
  border-radius: 2rem;
  padding: 0.75rem 2rem;
  text-transform: capitalize;
  font-weight: 600;
  transition: all 0.3s ease;
    background-color: black;
    color:white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
`;