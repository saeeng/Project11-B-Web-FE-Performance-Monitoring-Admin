import React, { useState, useEffect } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { Box } from '@material-ui/core';

import qs from 'querystring';
import IssueToolbar from './IssueToolbar';
import IssueListItem from './IssueListItem';
import service from '../../../service';
import { IssueType } from '../issueTypes';

function IssueTable(): React.ReactElement {
  const [issues, setIssues] = useState<IssueType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>();
  const [selectedProject, setSelectedProject] = useState<string[]>([
    '5fc8ed851f08a4a3b448d0e5',
    '5fc8ed851f08a4a3b448d0e5',
  ]);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  useEffect(() => {
    (async () => {
      const query = `?${qs.stringify({
        page,
        projectId: selectedProject,
      })}`;
      const res = await service.getIssues(query);
      setTotalPage(res.data.metaData[0].totalPage);
      setIssues(res.data.data);
    })();
  }, [page]);
  return (
    <Box my={1} display="flex" flexDirection="column">
      <Box flexGrow={1}>
        <Box>
          <Box
            display="flex"
            flexDirection="column"
            border="1px solid #cfcfcf"
            borderRadius=".2rem"
          >
            <IssueToolbar />
            {issues.map((issue) => (
              <IssueListItem key={issue._id} issue={issue} />
            ))}
            <Box display="flex" flexDirection="column" alignItems="center" p={1}>
              <Pagination count={totalPage} page={page} onChange={handlePageChange} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default IssueTable;