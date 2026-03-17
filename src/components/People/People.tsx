import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import cn from 'classnames';
import { useParams } from 'react-router-dom';

export const People = () => {
  const [people, setPeople] = useState<Person[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(error => {
        setHasError(true);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const peopleByName = new Map(people?.map(p => [p.name, p]));

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people?.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !hasError && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Born</th>
                  <th>Died</th>
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

              <tbody>
                {people?.map(person => {
                  const mother = peopleByName.get(person.motherName as string);
                  const father = peopleByName.get(person.fatherName as string);

                  return (
                    <tr
                      data-cy="person"
                      key={person.name}
                      className={cn(
                        slug === person.slug ? 'has-background-warning' : '',
                      )}
                    >
                      <td>
                        <a
                          href={`#/people/${person.slug}`}
                          className={cn(
                            person.sex === 'f' ? 'has-text-danger' : '',
                          )}
                        >
                          {person.name}
                        </a>
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        {mother ? (
                          <a
                            href={`#/people/${mother.slug}`}
                            className={cn(
                              mother.sex === 'f' ? 'has-text-danger' : '',
                            )}
                          >
                            {mother.name}
                          </a>
                        ) : (
                          person.motherName || '-'
                        )}
                      </td>
                      <td>
                        {father ? (
                          <a
                            href={`#/people/${father.slug}`}
                            className={cn(
                              father.sex === 'f' ? 'has-text-danger' : '',
                            )}
                          >
                            {father.name}
                          </a>
                        ) : (
                          person.fatherName || '-'
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
