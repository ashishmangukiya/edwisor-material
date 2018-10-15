import { AdminViewModule } from './admin-view.module';

describe('AdminViewModule', () => {
  let adminViewModule: AdminViewModule;

  beforeEach(() => {
    adminViewModule = new AdminViewModule();
  });

  it('should create an instance', () => {
    expect(adminViewModule).toBeTruthy();
  });
});
