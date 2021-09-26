import { HTTPMethod } from "@shared/store/ApiStore/types";
import {
  BranchItemApi,
  BranchItemModel,
  normalizeBranchItem,
} from "@store/models/gitHub/repoBranch";
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
import { GetRepoBranchListByIdParams, IReposBranchStore } from "./types";

const BASE_URL = "https://api.github.com";

type PrivateFields = "_list" | "_meta";

export default class ReposBranchStore
  // eslint-disable-next-line prettier/prettier
  implements IReposBranchStore, ILocalStore {
  private readonly _apiStore = new ApiStore(BASE_URL);

  private _list: CollectionModel<number, BranchItemModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ReposBranchStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      getRepoBranchListById: action,
    });
  }

  get list(): BranchItemModel[] {
    return this._list.order.map((id) => this._list.entities[id]);
  }

  get meta(): Meta {
    return this._meta;
  }
  async getRepoBranchListById(
    params: GetRepoBranchListByIdParams
  ): Promise<void> {
    this._meta = Meta.loading;

    const respose = await this._apiStore.request<BranchItemApi[]>({
      method: HTTPMethod.GET,
      endpoint: `/repositories/${params.repoId}/branches`,
    });

    runInAction(() => {
      if (!respose.success) {
        this._meta = Meta.error;
      }

      if (respose.success) {
        const list = getInitialCollectionModel();
        try {
          for (const item of respose.data) {
            list.order.push(item.commit.sha);
            list.entities[item.commit.sha] = normalizeBranchItem(item);
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
