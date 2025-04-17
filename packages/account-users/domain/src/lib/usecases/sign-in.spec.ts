import { Test, TestingModule } from '@nestjs/testing';
import { AccountRepository } from '../repository/account.repository';
import { SignInDto } from '../dtos/sign-in.dto';
import { AuthTokensDto } from '../dtos/auth-token.dto';
import { JwtTokenService } from '../service/jwt-token.service';
import {
  NotFoundException,
  InternalServerError,
  UnauthorizedException,
} from '@my-task-timer/shared-utils-errors';
import { SignInUseCase } from './sign-in';
import { CryptoServiceInterface } from '@my-task-timer/shared-interfaces';

describe('Sign In', () => {
  let signInUseCase: SignInUseCase;
  let accountRepository: AccountRepository;
  let jwtTokenService: JwtTokenService;
  let cryptoService: CryptoServiceInterface;

  const mockUser = {
    id: 'user-id-123',
    email: 'test@test.com',
    username: 'testuser',
    password: 'hashed-password',
  };

  const mockTokens: AuthTokensDto = {
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
  };

  beforeEach(async () => {
    const mockAccountRepository = {
      findByEmailOrUsername: jest.fn(),
    };

    const mockJwtTokenService = {
      generateAccessToken: jest.fn(),
      generateRefreshToken: jest.fn(),
    };

    const mockCryptoService = {
      compare: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignInUseCase,
        {
          provide: AccountRepository,
          useValue: mockAccountRepository,
        },
        {
          provide: JwtTokenService,
          useValue: mockJwtTokenService,
        },
        {
          provide: 'CryptoServiceInterface',
          useValue: mockCryptoService,
        },
      ],
    }).compile();

    signInUseCase = module.get<SignInUseCase>(SignInUseCase);
    accountRepository = module.get<AccountRepository>(AccountRepository);
    jwtTokenService = module.get<JwtTokenService>(JwtTokenService);
    cryptoService = module.get<CryptoServiceInterface>(
      'CryptoServiceInterface'
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(signInUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should sign in an existing user', async () => {
      const signInDto: SignInDto = {
        email: 'test@test.com',
        password: 'pass123456',
      };

      jest
        .spyOn(accountRepository, 'findByEmailOrUsername')
        .mockResolvedValueOnce(mockUser);
      jest.spyOn(cryptoService, 'compare').mockResolvedValueOnce(true);
      jest
        .spyOn(jwtTokenService, 'generateAccessToken')
        .mockReturnValueOnce(mockTokens.accessToken);
      jest
        .spyOn(jwtTokenService, 'generateRefreshToken')
        .mockReturnValueOnce(mockTokens.refreshToken);

      const result = await signInUseCase.execute(signInDto);

      expect(result).toEqual(mockTokens);
      expect(accountRepository.findByEmailOrUsername).toHaveBeenCalledWith(
        signInDto.email,
        undefined
      );

      expect(cryptoService.compare).toHaveBeenCalledWith(
        signInDto.password,
        mockUser.password
      );
    });

    it('should throw NotFoundException when user not found', async () => {
      const signInDto: SignInDto = {
        email: 'notfound@example.com',
        password: 'any-password',
      };

      jest
        .spyOn(accountRepository, 'findByEmailOrUsername')
        .mockRejectedValueOnce(new Error('User not found'));

      await expect(signInUseCase.execute(signInDto)).rejects.toThrow(
        NotFoundException
      );
    });

    it('should throw UnauthorizedException when password is incorrect', async () => {
      const signInDto: SignInDto = {
        username: 'testuser',
        password: 'invalid-password',
      };

      jest
        .spyOn(accountRepository, 'findByEmailOrUsername')
        .mockResolvedValueOnce(mockUser);

      jest.spyOn(cryptoService, 'compare').mockResolvedValueOnce(false);

      await expect(signInUseCase.execute(signInDto)).rejects.toThrow(
        UnauthorizedException
      );
    });

    it('should throw InternalServerError when token generation failed', async () => {
      const signInDto: SignInDto = {
        email: 'test@example.com',
        password: 'valid-password',
      };

      jest
        .spyOn(accountRepository, 'findByEmailOrUsername')
        .mockResolvedValueOnce(mockUser);
      jest.spyOn(cryptoService, 'compare').mockResolvedValueOnce(true);
      jest
        .spyOn(jwtTokenService, 'generateAccessToken')
        .mockImplementation(() => {
          throw new Error('Token generation error');
        });

      await expect(signInUseCase.execute(signInDto)).rejects.toThrow(
        InternalServerError
      );
    });
  });
});
