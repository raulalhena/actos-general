import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { GetUserLoginDto } from './dto/get-user-login.dto';

const userResult = {
  email: 'prueba1@actos.com',
  password: '1234'
};

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
    findByEmail: jest.fn().mockReturnValue(Promise.resolve(userResult)),
    login: jest.fn().mockResolvedValue({
      access_token: expect.any(String)
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, 
        {
					provide: UsersService,
					useValue: mockUsersService
				}
      ],
    }).overrideProvider(AuthService)
    .useValue(mockUsersService)
    .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('login() should return the access token', async () => {
    const getUserLoginDto: GetUserLoginDto = {
      email: 'prueba1@actos.com',
      password: '1234'
    };

    expect(await service.login(getUserLoginDto)).toMatchObject({
      access_token: expect.any(String)
    });
  });
});
