import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GetUserLoginDto } from './dto/get-user-login.dto';

const userResult = {
  email: 'prueba1@actos.com',
  password: '1234'
};

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    login: jest.fn().mockReturnValue(Promise.resolve(userResult))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('login() should return a User object', async () => {
    const getUserLoginDto: GetUserLoginDto = {
      email: 'prueba1@actos.com',
      password: '1234'
    };

    expect(await controller.login(getUserLoginDto)).toMatchObject(userResult);
  });
});
