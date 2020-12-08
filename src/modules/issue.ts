import _ from 'lodash';
import { Dispatch } from 'redux';
import { IIssue } from '../types';

import service from '../service';

const SET_ISSUE = 'issue/SET_ISSUE' as const;

const setIssueAction = (newIssue: IIssue) => ({ type: SET_ISSUE, issue: newIssue });

export const setIssue = (issueId: string) => async (dispatch: Dispatch): Promise<void> => {
  const res = await service.getIssue(issueId);
  const newIssue: IIssue = res.data;
  dispatch(setIssueAction(newIssue));
};

type CounterAction = ReturnType<typeof setIssueAction>;

/**
 * @TODO
 * dummy data를 어떻게 하지....???
 */
const issueDummy = {
  _id: {
    _id: '',
    message: '',
    type: '',
    project: [
      {
        _id: '',
        users: [''],
        isDeleted: false,
        name: '',
        description: '',
        owner: '',
        _v: '',
      },
    ],
    stack: {
      columnNo: '',
      lineNo: '',
      function: '',
      filename: '',
    },
    lastCrime: {
      _id: '',
      meta: {
        browser: {
          name: '',
          version: '',
        },
        os: {
          name: '',
          version: '',
        },
        url: '',
        ip: '',
      },
      message: '',
      type: '',
      stack: [
        {
          _id: '',
          columnNo: '',
          lineNo: '',
          function: '',
          filename: '',
        },
      ],
      occuredAt: '',
      sdk: {
        name: '',
        version: '',
      },
    },

    crimeIds: [''],
  },
  _stat: [
    {
      userIps: [''],
    },
  ],
};

function issue(state: IIssue = issueDummy, action: CounterAction): IIssue {
  switch (action.type) {
    case SET_ISSUE: {
      const newIssue: IIssue = action.issue;
      return newIssue;
    }
    default:
      return state;
  }
}

export default issue;
