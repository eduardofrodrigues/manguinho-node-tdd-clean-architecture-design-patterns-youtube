jest.mock('validator', () => ({
  isEmailValid: true,
  email: '',
  isEmail (email) {
    this.email = email
    return this.isEmailValid
  }
}))

const EmailValidator = require('./email-validator')
const MissingParamError = require('../errors/missing-param-error')
const validator = require('validator')

const makeSUT = () => {
  return new EmailValidator()
}

describe('Email validator', () => {
  test('Should return true if validator return true', () => {
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('valid_email@mail.com')
    expect(isEmailValid).toBe(true)
  })

  test('Should return false if validator return false', () => {
    validator.isEmailValid = false
    const sut = makeSUT()
    const isEmailInvalid = sut.isValid('invalid_email@mail.com')
    expect(isEmailInvalid).toBe(false)
  })

  test('Should call validator with correct email', () => {
    const sut = makeSUT()
    sut.isValid('any_email@mail.com')
    expect(validator.email).toBe('any_email@mail.com')
  })

  test('Should throws if no email is provided', async () => {
    const sut = makeSUT()
    expect(() => { sut.isValid() }).toThrow(new MissingParamError('email'))
  })
})
