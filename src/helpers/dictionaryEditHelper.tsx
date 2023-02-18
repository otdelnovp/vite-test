import { ICompanyElement } from '@pages/Dictionary/Company/model';
import { IDepartmentElement } from '@pages/Dictionary/Company/Department/model';
import { IContractElement } from '@pages/Dictionary/Company/Contract/model';
import { IProjectElement } from '@pages/Dictionary/Project/model';
import { IWorkspaceElement } from '@pages/Dictionary/Universal/Models/workspacesModel';
import { IWorkExceptionTypeElement } from '@pages/Dictionary/Universal/Models/workExceptionTypeModel';

import { ICompanyColumnElement } from '@pages/Dictionary/Company/columns';
import { IDepartmentColumnElement } from '@pages/Dictionary/Company/Department/columns';
import { IContractColumnElement } from '@pages/Dictionary/Company/Contract/columns';
import { IProjectColumnElement } from '@pages/Dictionary/Project/columns';
import { IWorkspaceColumnElement } from '@pages/Dictionary/Universal/Columns/workspaceColumns';
import { IWorkExceptionTypeColumnElement } from '@pages/Dictionary/Universal/Columns/workExceptionTypeColumns';

import { createRequest } from '@services/dispatcher';
import { getGuid } from './methods';
import { ISprintColumnElement } from '@pages/Dictionary/Project/Sprint/columns';
import { IPermissionElement } from '@pages/Dictionary/Universal/Models/permissionModel';
import { IPermissionColumnElement } from '@pages/Dictionary/Universal/Columns/permissionColumns';
import { IRoleElement } from '@pages/Dictionary/Universal/Models/roleModel';
import { IRoleColumnElement } from '@pages/Dictionary/Universal/Columns/roleColumns';
import { IUserGroupColumnElement } from '@pages/Dictionary/Universal/Columns/userGroupColumns';
import { IUserGroupElement } from '@pages/Dictionary/Universal/Models/userGroupModel';

export type IDictionaryListElement =
    | ICompanyColumnElement
    | IDepartmentColumnElement
    | IContractColumnElement
    | IProjectColumnElement
    | IWorkspaceColumnElement
    | IWorkExceptionTypeColumnElement
    | ISprintColumnElement
    | IPermissionColumnElement
    | IRoleColumnElement
    | IUserGroupColumnElement;

export type IDictionaryElement =
    | ICompanyElement
    | IDepartmentElement
    | IContractElement
    | IProjectElement
    | IWorkspaceElement
    | IWorkExceptionTypeElement
    | IPermissionElement
    | IRoleElement
    | IUserGroupElement;



interface IPostData {
    (apiEditFunction: string, setIsLoading: (isLoading: boolean) => void, body: any, setBody?: (newBody: any) => void): Promise<string>;
}

export const postData: IPostData = async (apiEditFunction, setIsLoading, body, setBody) => {
    setIsLoading(true);
    let newBody = { ...body };
    if (!body.Id && !body.id) {
        const newGuid = getGuid();
        newBody.Id = newGuid;
        if (setBody) setBody({ ...body, Id: newGuid });
    }
    const params = {
        type: apiEditFunction,
        body: { ...newBody },
    };
    const postData = await createRequest(params);
    // @ts-ignore
    const { error } = postData.data as IServerResponse;
    setIsLoading(false);
    if (error) {
        console.log('error', error);
        throw new Error(JSON.stringify(error));
    }
    console.log('no error', postData);
    // @ts-ignore
    if (postData.data && postData.data.body && postData.data.body.Id) {
        // @ts-ignore
        return postData.data.body.Id;
    }
    // @ts-ignore
    if (postData.data && postData.data.body && postData.data.body.Created) {
        // @ts-ignore
        return postData.data.body.Created;
    }
    return '';
};

interface IFetchData {
    (
        id: string,
        apiGetFunction: string,
        setIsLoading: (isLoading: boolean) => void,
        body: any,
        setBody: (newBody: any) => void,
        updateTableName: string | null,
    ): Promise<void>;
}

export const fetchData: IFetchData = async (id, apiGetFunction, setIsLoading, body, setBody, updateTableName) => {
    setIsLoading(true);
    const params =
        apiGetFunction === 'User.Get'
            ? {
                  type: apiGetFunction,
                  body: {
                      id: id,
                  },
              }
            : {
                  type: apiGetFunction,
                  body: {
                      Id: id,
                  },
              };
    const fetchData = await createRequest(params);
    // @ts-ignore
    const { error, body: newBody } = fetchData.data as IServerResponse;
    if (error) {
        throw error;
    } else {
        if (!updateTableName) {
            if (apiGetFunction === 'Dictionary.ProjectGet' && newBody.BoardStates) {
                const sortedBody = { ...newBody, BoardStates: [...newBody.BoardStates.sort((a: any, b: any) => a.N - b.N)] };
                setBody(sortedBody);
            } else {
                setBody(newBody);
            }
        } else {
            let updatedBody = {} as ICompanyElement;
            if (updateTableName === 'departments') {
                updatedBody = { ...body, Departments: newBody.Departments ? [...newBody.Departments] : [] };
            } else if (updateTableName === 'contracts') {
                updatedBody = { ...body, Contracts: newBody.Contracts ? [...newBody.Contracts] : [] };
            }
            setBody(updatedBody);
        }
    }
    setIsLoading(false);
};