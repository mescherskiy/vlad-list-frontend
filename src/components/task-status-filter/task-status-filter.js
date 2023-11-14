import React from 'react';
import { ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';

import './task-status-filter.css';

const TaskStatusFilter = ({ onFilterChange, activeFilter }) => {

  const filters = ["All", "Active", "Done"]

  return (
    <ButtonToolbar>
      <ButtonGroup>
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? 'primary' : 'light'}
            onClick={() => onFilterChange(filter)}>
              {filter}
            </Button>
        ))}
      </ButtonGroup>
    </ButtonToolbar>
  )
}

export default TaskStatusFilter