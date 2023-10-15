export default interface UseCase<E,O> {
    get(input: E): Promise<O>
    getOne(input: E): Promise<O>
    post(input: E): Promise<O>
}