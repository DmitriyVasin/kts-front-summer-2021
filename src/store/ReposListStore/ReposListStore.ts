import { HTTPMethod } from "@shared/store/ApiStore/types";
import {
  normalizeRepoItem,
  RepoItemApi,
  RepoItemModel,
} from "@store/models/gitHub";
import {
  CollectionModel,
  getInitialCollectionModel,
} from "@store/models/gitHub/shared/collection";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import ApiStore from "../../shared/store/ApiStore";
import { IReposListStore, GetOrganizationReposListParams } from "./types";

const BASE_URL = "https://api.github.com";

type PrivateFields = "_list" | "_meta";

export default class ReposListStore implements IReposListStore, ILocalStore {
  private readonly _apiStore = new ApiStore(BASE_URL);

  private _list: CollectionModel<number, RepoItemModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ReposListStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      getOrganizationReposList: action,
    });
  }

  get list(): RepoItemModel[] {
    return this._list.order.map((id) => this._list.entities[id]);
  }

  get meta(): Meta {
    return this._meta;
  }

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void> {
    this._meta = Meta.loading;

    const respose = await this._apiStore.request<RepoItemApi[]>({
      method: HTTPMethod.GET,
      endpoint: `/orgs/${params.organizationName}/repos`,
      data: params.data,
    });

    runInAction(() => {
      if (!respose.success) {
        this._meta = Meta.error;
      }

      if (respose.success) {
        const list = getInitialCollectionModel();
        try {
          for (const item of respose.data) {
            list.order.push(item.id);
            list.entities[item.id] = normalizeRepoItem(item);
          }

          this._meta = Meta.success;
          this._list = {
            order: [...this._list.order, ...list.order],
            entities: { ...this._list.entities, ...list.entities },
          };
          return;
        } catch (e) {
          this._meta = Meta.error;
          this._list = getInitialCollectionModel();
        }
      }
    });
  }

  destroy() {
    this._list = getInitialCollectionModel();
  }
}
